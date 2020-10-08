import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render,fireEvent } from '@testing-library/react';
import { default as fetcher } from 'node-fetch';
import SignUp from '../Components/Signup/Signup';
import DashBoard from '../Components/Dashboard/Dashboard';
import AuthContextProvider from '../contexts/AuthContext';
import '../../src/setupTests'
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const componentTest = () => {
  return (
    <BrowserRouter>

      <Switch>
        <AuthContextProvider>
          <Route path="/" component={SignUp} exact />
          <Route path="/dashboard" component={DashBoard} />
        </AuthContextProvider>
      </Switch>

    </BrowserRouter>
  );
};

test('Must render properly', () => {
  const tree = renderer
    .create(componentTest())
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('it cannot signup without values',async () => {
  const formInput= {
    email: '',
    password:'',
    location:'',
    firstname:'',
    gender:'',
    confirm:''
  
  };
  const { getByLabelText, getByText} = render(componentTest());
     fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
     fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
     fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
     fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
     fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
     fireEvent.change(getByLabelText('Confirm Password'), {target:{value:formInput.password}})
     fireEvent.click(getByText(/Signup/i))
     expect(()=>getByText(/Please input your firstname/i)).toBeTruthy()
     expect(()=>getByText(/Gender is required/i)).toBeTruthy()
     expect(()=>getByText(/Please input your E-mail!/i)).toBeTruthy()
     expect(()=>getByText(/Please type you location here/i)).toBeTruthy()
     expect(()=>getByText(/Please input your password!/i)).toBeTruthy()
     expect(()=>getByText(/Please confirm your password!/i)).toBeTruthy()
});



test('it cannot signup without email',async () => {
    const formInput= {
      email: '',
      password:'Ayodeji00;',
      confirm:'Ayodeji00;',
      location:'Ado Ekiti Lat 34^ Log40^',
      firstname:'Adewumi',
      gender:'Male'
    };
    const { getByLabelText, getByText} = render(componentTest());
       fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
       fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
       fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
       fireEvent.change(getByLabelText(/Confirm Password/i), {target:{value:formInput.confirm}})
       fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
       fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
       fireEvent.click(getByText(/Signup/i))
       expect(()=>getByText(/Please input your E-mail!/i)).toBeTruthy()
      
  });
  
test('it cannot signup without password',async () => {
    const formInput= {
      email: 'test@gmail.com',
      password:'',
      location:'Ado Ekiti Lat 34^ Log40^',
      firstname:'Adewumi',
      gender:'Male'
    };
    const { getByLabelText, getByText} = render(componentTest());
       fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
       fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
       fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
       fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
       fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
       fireEvent.click(getByText(/Signup/i))
       expect(()=>getByText(/Please input your password!/i)).toBeTruthy()
  });

  test('it cannot signup if password does not match',async () => {
    const formInput= {
      email: 'test@gmail.com',
      password:'adewumi001',
      confirm:'001fgffgfgfg',
      location:'Ado Ekiti Lat 34^ Log40^',
      firstname:'Adewumi',
      gender:'Male'
    };
    const { getByLabelText, getByText} = render(componentTest());
       fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
       fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
       fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
       fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
       fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
       fireEvent.click(getByText(/Signup/i))
       expect(()=>getByText(/The two passwords that you entered do not match!/i)).toBeTruthy()
  });
  
  test('it cannot signup without location',async () => {
    const formInput= {
      email: 'test@gmail.com',
      password:'Ayodeji00;',
      location:'',
      confirm:'Ayodeji00;',
      firstname:'Adewumi',
      gender:'Male'
    };
    const { getByLabelText, getByText} = render(componentTest());
       fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
       fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
       fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})

       fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
       fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
       fireEvent.change(getByLabelText(/Confirm Password/i), {target:{value:formInput.confirm}})
       fireEvent.click(getByText(/Signup/i))
       expect(()=>getByText(/Please type you location here/i)).toBeTruthy()
  });
  test('it cannot signup without firstname',async () => {
    const formInput= {
      email: 'test@gmail.com',
      password:'Ayodeji00;',
      confirm:'Ayodeji00;',
      location:'Ado Ekiti Lat 34^ Log40^',
      firstname:'',
      gender:'Male'
    };
    const { getByLabelText, getByText} = render(componentTest());
       fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
       fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
       fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
       fireEvent.change(getByLabelText(/Confirm Password/i), {target:{value:formInput.confirm}})
       fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
       fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
       fireEvent.click(getByText(/Signup/i))
       expect(()=>getByText(/Please input your firstname/i)).toBeTruthy()
  });

  test('it cannot signup without gender',async () => {
    const formInput= {
      email: 'test@gmail.com',
      password:'Ayodeji00;',
      confirm:'Ayodeji00;',
      location:'Ado Ekiti Lat 34^ Log40^',
      firstname:'Adewumi',
      gender:''
    };
    const { getByLabelText, getByText} = render(componentTest());
       fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
       fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
       fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
       fireEvent.change(getByLabelText(/Confirm Password/i), {target:{value:formInput.confirm}})
       fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
       fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
       fireEvent.click(getByText(/Signup/i))
       expect(()=>getByText(/Gender is required/i)).toBeTruthy()
  });
  
  
  
test('it can signup with the right credentials',async () => {
  const body = {
    user: {
        email: 'uniquetestemail@gmail.com',
        password:'Ayodeji00;',
        location:'Ado Ekiti Lat 34^ Log40^',
        firstName:'Adewumi',
        confirm:'Ayodeji00;',
        gender:'male'
    },
    status: 'success',
  };
  // mock respone
  fetcher.mockReturnValue(Promise.resolve(new Response(JSON.stringify(body))));

  const formInput= {
    email: 'uniquetestemail@gmail.com',
    password:'Ayodeji00;',
    location:'Ado Ekiti Lat 34^ Log40^',
    firstname:'Adewumi',
    gender:'male'
  };
  const { getByLabelText, getByText } = render(componentTest());
      fireEvent.change(getByLabelText(/First name/i), {target:{value:formInput.firstname}})
      fireEvent.change(getByLabelText(/Gender/i), {target:{value:formInput.gender}})
      fireEvent.change(getByLabelText(/E-mail/i), {target:{value:formInput.email}})
      fireEvent.change(getByLabelText(/Confirm Password/i), {target:{value:formInput.confirm}})
      fireEvent.change(getByLabelText(/Enter your location/i), {target:{value:formInput.location}})
      fireEvent.change(getByLabelText('Password'), {target:{value:formInput.password}})
     fireEvent.click(getByText(/Signup/i))
     expect(()=>getByText(/Welcome Adewumi/i)).toBeTruthy()
 
});
