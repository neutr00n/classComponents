import { Rings } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Rings
      height="160"
      width="160"
      color="#4fa94d"
      radius="6"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};
