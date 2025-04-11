import { PricePerUnitPipe } from './price-per-unit.pipe';

describe('PricePerUnitPipe', () => {
  it('create an instance', () => {
    const pipe = new PricePerUnitPipe();
    expect(pipe).toBeTruthy();
  });
});
