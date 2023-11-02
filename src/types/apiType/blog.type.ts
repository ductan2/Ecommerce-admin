import { UploadImageType } from "../CommonTpye"

export interface Blog {
   _id?: string
   title: string
   description:  TrustedHTML
   category: string[]
   images?: UploadImageType | string
   numViews?: number
   isLiked?: boolean
   isDisliked?: boolean
   likes?: string[]  // refrerence to user
   dislikes?: string[] // refrerence to user
   author?: string
   created_at?: string
   updated_at?: string
}