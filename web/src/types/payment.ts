export interface Payment {
  id?: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: "pending" | "completed" | "failed";
  createdAt: any;
  updatedAt: any;
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

