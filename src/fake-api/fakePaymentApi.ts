import { faker } from '@faker-js/faker';
import { FakeApi } from '@/fake-api/core/fakeApi.ts';

export type ApaSauCafea = 'apa' | 'cafea';
export type Payment = {
  id: string;
  userId: string;
  suma: number;
  pentru: ApaSauCafea;
};

export type Person = {
  id: string;
  nume: string;
  prenume: string;
  dataInscriere: string;
  participaApa: boolean;
  participaCafea: boolean;
};

const generateNewPerson = (): Person => {
  return {
    id: faker.string.uuid(),
    nume: faker.person.firstName(),
    prenume: faker.person.lastName(),
    dataInscriere: faker.date.past().toISOString().slice(0, -5),
    participaApa: faker.datatype.boolean({ probability: 0.9 }),
    participaCafea: faker.datatype.boolean({ probability: 0.5 }),
  };
};

export const FakePersonApi = new FakeApi<Person>({
  generatorFunction: generateNewPerson,
  dataSize: 30,
  delayTimer: 200,
  localStorageKey: 'person',
});

const generateNewPayment = (): Payment => {
  return {
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(FakePersonApi.getInitialData().map((x) => x.id)),
    suma: faker.number.int({ min: 10, max: 150, multipleOf: 10 }),
    pentru: faker.datatype.boolean() ? 'apa' : 'cafea',
  };
};

export const FakePaymentApi = new FakeApi<Payment>({
  generatorFunction: generateNewPayment,
  dataSize: 200,
  delayTimer: 200,
  localStorageKey: 'payment',
});
