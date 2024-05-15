<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class OfferController extends Controller
{
    public function showAllOffers()
    {
        $offers = Offer::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'offers' => $offers,
        ]);
    }

    public function show($offerId)
    {
        $offer = Offer::find($offerId);
        if (!$offer) {
            return response()->json([
                'error' => 'offer not found',
            ]);
        }
        return response()->json([
            'offer' => $offer,
        ]);
    }

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:50',
            'phone_number' => 'required|string|max:50',
            'unit_type' => 'required|string',
            'unit_area' => 'required|string',
            'location' => 'required|string',
            'budget' => 'required|string',
            'attachment' => 'nullable|image|mimes:jpg,png|max:2050',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }

        if ($request->hasFile('attachment')) {
            $image = Storage::putFile('images', $request->attachment);
        } else {
            $image = null;
        }

        $offer = Offer::create([
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'unit_type' => $request->unit_type,
            'unit_area' => $request->unit_area,
            'location' => $request->location,
            'budget' => $request->budget,
            'attachment' => $image,
        ]);

        return response()->json([
            'msg' => 'offer created successfully',
            'offer' => $offer,
            'image' => url('') . '/' . $offer->attachment,
        ]);
    }
    
    public function deleteOffer($offerId)
    {
        $offer = Offer::find($offerId);
        if ($offer) {
            $offer->delete();
            return response()->json([
                'msg' => 'offer deleted successfully',
                'offer' => $offer,
            ]);
        } else {
            return response()->json([
                'error' => 'offer not found',
            ]);
        }
    }

}
