export const dummySession = {
  me: {
    email: 'test@mail.com',
    firstName: 'test',
    id: '1234567',
    lastName: 'tester',
    mobileNumber: '+254717123456',
    role: {
      name: 'Master Admin',
      __typename: 'RoleType'
    },
    secondaryEmail: 'njihiadee@outlook.com',
    secondaryPhoneNumber: '+254717123456',
    username: 'darius',
    users: [{}, {}],
  }
};

export const context = ['kitty', jest.fn()];
