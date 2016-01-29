import timeAgo from './time.filter';

describe('Time ago filter', () => {
  const now = new Date().valueOf();
  const res = timeAgo();

  it('should convert date to minutes passed', () => {
    const minute = 1000 * 60;
    const resSingle = res(now - minute);
    const resPlural = res(now - minute * 2);
    expect(resSingle).toEqual('1 minute ago');
    expect(resPlural).toEqual('2 minutes ago');
  });

  it('should convert date to hours passed', () => {
    const hour = 1000 * 60 * 60;
    const resSingle = res(now - hour);
    const resPlural = res(now - hour * 2);
    expect(resSingle).toEqual('1 hour ago');
    expect(resPlural).toEqual('2 hours ago');
  });

  it('should convert date to days passed', () => {
    const day = 1000 * 60 * 60 * 24;
    const resSingle = res(now - day);
    const resPlural = res(now - day * 2);
    expect(resSingle).toEqual('1 day ago');
    expect(resPlural).toEqual('2 days ago');
  });

  it('should convert date to months passed', () => {
    const month = 1000 * 60 * 60 * 24 * 365 / 12;
    const resSingle = res(now - month);
    const resPlural = res(now - month * 2);
    expect(resSingle).toEqual('1 month ago');
    expect(resPlural).toEqual('2 months ago');
  });

  it('should convert date to years passed', () => {
    const year = 1000 * 60 * 60 * 24 * 365;
    const resSingle = res(now - year);
    const resPlural = res(now - year * 2);
    expect(resSingle).toEqual('1 year ago');
    expect(resPlural).toEqual('2 years ago');
  });
});
