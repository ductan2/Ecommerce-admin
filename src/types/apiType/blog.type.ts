import { UploadImageType } from "../CommonTpye"

export interface Blog {
   _id?: string
   title: string
   description: string
   images?: UploadImageType | string
   category: string[]
   numViews?: number
   isLiked?: boolean
   isDisliked?: boolean
   likes?: string[]  // refrerence to user
   dislikes?: string[] // refrerence to user
   author?: string
   craeted_at?: string
   updated_at?: string
}