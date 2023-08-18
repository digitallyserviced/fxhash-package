import { TzktOperation } from "./../types/Tzkt"
import type { WalletOperation } from "@taquito/taquito"
import { useContext, useRef, useState } from "react"
import { TAnyContractOperation } from "../services/operations/ContractOperation"
import {
  ContractOperationCallback,
  ContractOperationStatus,
  TAnyContractOperationHookReturn,
} from "../types/Contracts"
import { useIsMounted } from "./useIsMounted"
import { UserContext } from "context/User"

interface OptionsContractOperation {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

/**
 * A
 */
export function useContractOperation<Params>(
  OperationClass: TAnyContractOperation<Params>,
  options: OptionsContractOperation = {}
): TAnyContractOperationHookReturn<Params> {
  const [state, setState] = useState<ContractOperationStatus>(
    ContractOperationStatus.NONE
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [opHash, setOpHash] = useState<string | null>(null)
  const [operation, setOperation] = useState<WalletOperation | null>(null)
  const [opData, setOpData] = useState<TzktOperation[] | null>(null)
  const [params, setParams] = useState<Params | null>(null)
  const counter = useRef<number>(0)
  const isMounted = useIsMounted()
  const userContext = useContext(UserContext)
  // const messageCenter = useContext(MessageCenterContext)

  // resets the state
  const clear = () => {
    setLoading(false)
    setSuccess(false)
    setError(false)
    setOpHash(null)
    setOperation(null)
    setOpData(null)
    setParams(null)
    setState(ContractOperationStatus.NONE)
  }

  // trigger the operation with the given parameters
  const call = async (params: Params) => {
    setLoading(true)
    setSuccess(false)
    setError(false)
    setOpHash(null)
    setOperation(null)
    setOpData(null)
    setParams(params)
    setState(ContractOperationStatus.NONE)

    // assign the ID to this call and increment it to prevent overlaps
    counter.current++
    const id = counter.current

    // will be called to propagate the call progress
    const statusCallback: ContractOperationCallback = (status, data) => {
      if (counter.current === id && isMounted()) {
        setState(status)
        // if operation is *INJECTED*, we sent success
        if (status === ContractOperationStatus.INJECTED) {
          setSuccess(true)
          setLoading(false)
          // todo: type this shit
          if (data?.hash) {
            setOpHash(data.hash)
          }
          if (data?.operation) {
            setOperation(data.operation)
          }
          if (data?.opData) {
            setOpData(data.opData)
          }
          if (options.onSuccess) {
            options.onSuccess(data)
          }
        } else if (status === ContractOperationStatus.ERROR) {
          options.onError?.(data)
          setLoading(false)
          setError(true)
        }
      }

      // even if not mounted anymore we push the messages to message center
      if (status === ContractOperationStatus.INJECTED) {
        // messageCenter.addMessage(createOperationAppliedAlert(data.message))
      } else if (status === ContractOperationStatus.ERROR) {
        // messageCenter.addMessage({
        //   type: "error",
        //   title: "An error occured",
        //   content: data,
        // })
      }
    }

    // if there's no user synced, we request a sync
    if (!userContext.user || !userContext.walletManager) {
      try {
        await userContext.connect()
      } catch (err) {
        statusCallback(
          ContractOperationStatus.ERROR,
          "Wallet needs to be synced to run operations"
        )
        return
      }
    }

    // otherwise we can just trigger the operation
    userContext.walletManager?.runContractOperation(
      OperationClass,
      params,
      statusCallback
    )
  }

  return {
    state,
    params,
    opHash,
    operation,
    opData,
    loading,
    success,
    call,
    clear,
    error,
  }
}
