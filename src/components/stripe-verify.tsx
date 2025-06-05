import React from 'react'
import {Link, Button} from "@payloadcms/ui";

export default function StripeVerify() {
  return (
      <Link href={"/stripe-verify"}>
        <Button>
          Verify account
        </Button>
      </Link>
  )
}
