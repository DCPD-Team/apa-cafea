import { faker } from '@faker-js/faker';
import { FakeApi } from '@/fake-api/core/fakeApi.ts';
import { Database } from '../../database.types.ts';

export type ApaSauCafea = 'apa' | 'cafea';
export type Payment = {
  id: string;
  userId: string;
  suma: number;
  pentru: ApaSauCafea;
  data: string;
};

export type Person = Database['public']['Tables']['persons']['Row'];

export type Cheltuiala = {
  id: string;
  descriere: string;
  suma: number;
  data: string;
  pentru: ApaSauCafea;
};

export const compareByName = (a: Person, b: Person): number => a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase());
export const compareByDataInscriere = (a: Person, b: Person): number =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
export const compareByDataCheltuiala = (a: Cheltuiala, b: Cheltuiala): number =>
  new Date(a.data).getTime() - new Date(b.data).getTime();

const generateNewPerson = (): Person => {
  return {
    id: faker.string.uuid(),
    last_name: faker.person.firstName(),
    first_name: faker.person.lastName(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    water: faker.datatype.boolean({ probability: 0.9 }),
    coffee: faker.datatype.boolean({ probability: 0.4 }),
  };
};

export const FakePersonApi = new FakeApi<Person>({
  generatorFunction: generateNewPerson,
  dataSize: 30,
  delayTimer: 1000,
  localStorageKey: 'person',
});

const generateNewPayment = (): Payment => {
  return {
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(FakePersonApi.getInitialData().map((x) => x.id)),
    suma: faker.number.int({ min: 10, max: 150, multipleOf: 10 }),
    pentru: faker.datatype.boolean() ? 'apa' : 'cafea',
    data: faker.date.past().toISOString(),
  };
};

export const FakePaymentApi = new FakeApi<Payment>({
  generatorFunction: generateNewPayment,
  dataSize: 200,
  delayTimer: 200,
  localStorageKey: 'payment',
});

const generateNewCheltuiala = (): Cheltuiala => {
  return {
    id: faker.string.uuid(),
    descriere: faker.commerce.productDescription(),
    suma: faker.number.int({ min: 10, max: 150, multipleOf: 10 }),
    pentru: faker.datatype.boolean() ? 'apa' : 'cafea',
    data: faker.date.past().toISOString(),
  };
};

export const FakeCheltuialaApi = new FakeApi<Cheltuiala>({
  generatorFunction: generateNewCheltuiala,
  dataSize: 200,
  delayTimer: 200,
  localStorageKey: 'cheltuiala',
});
