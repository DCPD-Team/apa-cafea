import { Database } from '../../database.types.ts';

export type ApaSauCafea = 'apa' | 'cafea';

export type Months = Database['public']['Tables']['months']['Row'];

export type ExpenseType = Database['public']['Tables']['expense_type']['Row'];

export type MonthlyPrices = Database['public']['Tables']['monthly_prices']['Row'];

export type MonthlyPayments = Database['public']['Tables']['monthly_payments']['Row'];

export type Payment = Database['public']['Tables']['payments']['Row'];

export type Contribution = Database['public']['Tables']['contributions']['Row'];

export type Person = Database['public']['Tables']['persons']['Row'];

export type Cheltuiala = Database['public']['Tables']['expenses']['Row'];

export const compareByName = (a: Person, b: Person): number =>
  a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase());
export const compareByDataInscriere = (a: Person, b: Person): number =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
export const compareByDataCheltuiala = (a: Cheltuiala, b: Cheltuiala): number =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
