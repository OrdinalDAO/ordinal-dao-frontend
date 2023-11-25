interface Item {
    id: number;
    slug: string;
    user_id: number;
    loan_id: number;
    image_url: string;
    escrow_id: number;
    health_factor: number;
    floor_price: number;
    created_at: string | null;
    updated_at: string | null;
    loan: {
      id: number;
      loan_slug: string;
      user_id: number;
      debt_principal: number;
      debt_interest: number;
      loan_duration: number;
      created_at: string;
      updated_at: string;
    };
  }
  