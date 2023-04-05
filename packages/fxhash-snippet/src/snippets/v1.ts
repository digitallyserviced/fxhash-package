export const snippet_v1: string = `
//---- do not edit the following code (you can indent as you wish)
  let search = new URLSearchParams(window.location.search)
  let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  var fxhash = search.get('fxhash') || "oo" + Array(49).fill(0).map(_=>alphabet[(Math.random()*alphabet.length)|0]).join('')
  let b58dec = str=>[...str].reduce((p,c)=>p*alphabet.length+alphabet.indexOf(c)|0, 0)
  let fxhashTrunc = fxhash.slice(2)
  let regex = new RegExp(".{" + ((fxhash.length/4)|0) + "}", 'g')
  let hashes = fxhashTrunc.match(regex).map(h => b58dec(h))
  let sfc32 = (a, b, c, d) => {
    return () => {
      a |= 0; b |= 0; c |= 0; d |= 0
      var t = (a + b | 0) + d | 0
      d = d + 1 | 0
      a = b ^ b >>> 9
      b = c + (c << 3) | 0
      c = c << 21 | c >>> 11
      c = c + t | 0
      return (t >>> 0) / 4294967296
    }
  }
  var fxrand = sfc32(...hashes)
  // true if preview mode active, false otherwise
  // you can append preview=1 to the URL to simulate preview active
  var isFxpreview = search.get('preview') === "1"
  // call this method to trigger the preview
  function fxpreview() {
    console.log("fxhash: TRIGGER PREVIEW")
  }
  //---- /do not edit the following code
`
