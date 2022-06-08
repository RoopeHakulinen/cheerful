import { EllipsisPipe } from './ellipsis.pipe';

const ellipsisPipe = new EllipsisPipe();

describe('should apply the ellipsis', () => {
  it('correctly with too many characters', () => {
    expect(ellipsisPipe.transform('ronionparas', 5)).toEqual('ronio...');
  });

  it('correctly with too few characters', () => {
    expect(ellipsisPipe.transform('ronionparas', 12)).toEqual('ronionparas');
  });
  
  it('correctly with equal amount characters', () => {
    expect(ellipsisPipe.transform('ronionparas', 11)).toEqual('ronionparas');
  });
});