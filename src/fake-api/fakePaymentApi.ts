import { faker } from '@faker-js/faker';
import { FakeApi } from '@/fake-api/core/fakeApi.ts';

export type ApaSauCafea = 'apa' | 'cafea';
export type Payment = {
  id: string;
  userId: string;
  suma: number;
  pentru: ApaSauCafea;
  data: string;
};

export type Person = {
  id: string;
  nume: string;
  prenume: string;
  dataInscriere: string;
  participaApa: boolean;
  participaCafea: boolean;
};

export type Cheltuiala = {
  id: string;
  descriere: string;
  suma: number;
  data: string;
  pentru: ApaSauCafea;
};

export const compareByName = (a: Person, b: Person): number => a.nume.toLowerCase().localeCompare(b.nume.toLowerCase());
export const compareByDataInscriere = (a: Person, b: Person): number =>
  new Date(a.dataInscriere).getTime() - new Date(b.dataInscriere).getTime();
export const compareByDataCheltuiala = (a: Cheltuiala, b: Cheltuiala): number =>
  new Date(a.data).getTime() - new Date(b.data).getTime();

const generateNewPerson = (): Person => {
  return {
    id: faker.string.uuid(),
    nume: faker.person.firstName(),
    prenume: faker.person.lastName(),
    dataInscriere: faker.date.past().toISOString(),
    participaApa: faker.datatype.boolean({ probability: 0.9 }),
    participaCafea: faker.datatype.boolean({ probability: 0.4 }),
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
