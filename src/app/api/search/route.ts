import { NextResponse } from "next/server";
import { PropertyService } from "../impl/service/supply/property/property.service";

const propertyService = new PropertyService();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const limit = limitParam ? Number(limitParam) : 20;
    const page = pageParam ? Number(pageParam) : 1;

    const searchResults = await propertyService.getPropertyListings(limit, page);

    return NextResponse.json({ searchResults })
}