type FixedString<N extends number> = { 0: string, length: N } & string

type HexColor = `#${FixedString<1>}${FixedString<1>}${FixedString<1>}` | `#${FixedString<2>}${FixedString<2>}${FixedString<2>}`

const hexToRgb = (hex: HexColor): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ]
}

const isHexColor = (color: string): asserts color is HexColor => {
  if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color)) throw new Error('Invalid hex color')
}

export const lighten = (color: HexColor): HexColor => {

}

let testfunc = (a: FixedString<1>) => {
    return
}

testfunc('a')
