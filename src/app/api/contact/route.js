import connectToDB from "@/configs/db";
import contactModel from "@/models/Contact";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const { name, email, company, phone, message } = body;

    if (
      !name ||
      !email ||
      !company ||
      !phone ||
      !message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\d+$/.test(phone)
    ) {
      return Response.json(
        { message: "اطلاعات وارد شده نامعتبر است." },
        { status: 422 }
      );
    }

    await contactModel.create({ name, email, company, phone, message });

    return Response.json({ message: "پیام با موفقیت ثبت شد." }, { status: 201 });
  } catch (error) {
    console.error("Error in contact API:", error);
    return Response.json(
      { message: "خطایی در سرور رخ داده است." },
      { status: 500 }
    );
  }
}
