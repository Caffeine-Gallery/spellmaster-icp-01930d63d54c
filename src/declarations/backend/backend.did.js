export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkSpelling' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
    'getRandomWord' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
