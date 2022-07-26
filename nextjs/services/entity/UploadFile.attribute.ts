import BaseAttribute from "./Base.attribute"

interface UploadFileAttribute extends BaseAttribute {
  alternativeText?: string
  caption?: string
  ext?: string
  formats?: JSON
  hash?: string
  height?: Number
  mime?: string
  name?: string
  previewUrl?: string
  provider?: string
  provider_metadata?: JSON
  related?: any
  size?: Number
  url: string
  width?: Number
}

export default UploadFileAttribute