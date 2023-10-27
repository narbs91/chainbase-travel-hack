import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "../impl/service/supply/property/property.service";

const propertyService = new PropertyService();

export async function GET(request: NextRequest) {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const pageParam = request.nextUrl.searchParams.get("page");

    const limit = limitParam ? Number(limitParam) : 20;
    const page = pageParam ? Number(pageParam) : 1;

    const searchResults = await propertyService.getPropertyListings(limit, page);

    return NextResponse.json({ searchResults })
}