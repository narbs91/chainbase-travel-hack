import { NextResponse } from "next/server";
import { PropertyService } from "../impl/service/supply/property/property.service";
import { UserPropertiesResponse } from "../impl/types/httpResponses"
const propertyService = new PropertyService();

export const maxDuration = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const response: UserPropertiesResponse = {
    properties: []
  };
  const walletAddress = searchParams.get('walletAddress');
  if (walletAddress) {
    const properties = await propertyService.getUserListingsForDashboard(
      walletAddress
    );

    response.properties = properties;

    return NextResponse.json(response);
  } else {
    return NextResponse.error();
  }

}

export async function POST(request: Request) {
  const data = await request.json()
  const success = await propertyService.createPropertyListing(data);

  if (success) {
    return NextResponse.json({ success });
  } else {
    return NextResponse.error();
  }
}