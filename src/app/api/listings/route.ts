import { NextResponse } from "next/server";
import { ImportBookingService } from "../impl/service/import/import.booking.service";
import { NFTService } from "../impl/service/nft/nft.service";
import { PropertyService } from "../impl/service/supply/property/property.service";
import { UserPropertiesResponse } from "../impl/types/httpResponses"
const propertyService = new PropertyService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const response:UserPropertiesResponse = {
    properties : []
  }
  const walletAddress = searchParams.get('walletAddress')
  if (walletAddress) {
    const properties = await propertyService.getUserListingsForDashboard(
        walletAddress
    );

    response.properties = properties
    
    return NextResponse.json(response)
  } else {
    return NextResponse.error()
  }
    
}

export async function POST(request: Request) {
  const data = await request.json()
  console.log(data)
  const success = await propertyService.createPropertyListing(data);

  if (success) {
   return NextResponse.json('')
  } else {
    return NextResponse.error
  }
}