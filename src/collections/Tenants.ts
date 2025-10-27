import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access:{
    create:({req})=>isSuperAdmin(req.user),
    delete:({req})=>isSuperAdmin(req.user)
  },
  admin: {
    useAsTitle: 'slug',
  },
  
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name:"name",
      required:true,
      type:"text",
      label:"Store Name",
      admin:{
        description:"This is the name of the store (e.g. Antonio's Store)"
      }
    },{
        name:"slug",
        type:"text",
        index:true,
        required:true,
        unique:true,
        access:{
          update:({req})=>isSuperAdmin(req.user)
        },
        admin:{
            description:"This is the subdomain for the store"
        }
    },{
        name:"image",
        type:"upload",
        relationTo:"media"
    },{
        name:"stripeAccountId",
        type:"text",
        required:true,
        access:{
          update:({req})=>isSuperAdmin(req.user)
        },
        admin:{
            
            description:"Stripe Account ID associated with your shop"
        }
        
    },{
        name:"stripeDetailSubmitted",
        type:"checkbox",
        access:{
          update:({req})=>isSuperAdmin(req.user)
        },
        admin:{
            readOnly:true,
            description:"You cannot create products until you submit your Stripe details"
        }
    }
  ],
}
