export const setPending = (state) => {
  state.loading = true;
  state.apiRes = {
    message: '',
    code: '',
    success: false,
    notification: false,
  };
};

export const setRejected = (state, action) => {
  state.loading = false;
  const errorRes = action.payload;
  state.apiRes = {
    message: errorRes?.message || '',
    code: errorRes?.code || '',
    success: false,
    notification: true,
  };
};
