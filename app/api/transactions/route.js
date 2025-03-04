import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db("henil");
    const transactions = database.collection("transactions");

    const data = await transactions.find({}).sort({ date: 1 }).toArray();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  try {
    const { amount, date, description , category } = await request.json();
    if (!amount || !date || !description || !category) {
      return NextResponse.json({ success: false, error: "All fields are required!" });
    }

    await client.connect();
    const database = client.db("henil");
    const transactions = database.collection("transactions");

    const result = await transactions.insertOne({ amount, date, description , category });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}

export async function PUT(request) {
  try {
    const { id, amount, date, description, category } = await request.json();
    
    if (!id || !amount || !date || !description || !category) {
      return NextResponse.json({ success: false, error: "All fields are required!" });
    }

    await client.connect();
    const database = client.db("henil");
    const transactions = database.collection("transactions");

    const result = await transactions.updateOne(
      { _id: new ObjectId(id) },
      { $set: { amount, date, description , category } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, error: "Transaction not found or not updated" });
    }

    return NextResponse.json({ success: true, message: "Transaction updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Transaction ID is required!" });
    }

    await client.connect();
    const database = client.db("henil");
    const transactions = database.collection("transactions");

    const result = await transactions.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Transaction not found or not deleted" });
    }

    return NextResponse.json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}