import { faker } from "@faker-js/faker"

export function newFruit() {
  const fruit = {
    name: faker.person.fullName(),
    price: faker.commerce.price()
  }
  return fruit
}