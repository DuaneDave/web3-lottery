'use client';

import { useState, useEffect } from 'react';

import web3 from '../web3';
import lottery from '../lottery';

export default function Home() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');

  const [value, setValue] = useState('');

  useEffect(() => {
    const getManager = async () => {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      console.log(manager, players, balance);

      typeof manager === 'string' && setManager(manager);
      typeof players === 'object' && setPlayers(players);
      typeof balance === 'number' && setBalance(balance);
    };

    getManager();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    console.log('Sending from account', accounts[0]);

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    });

    setMessage('You have been entered!');
  };

  return (
    <main>
      <h1>Lottery Contract</h1>
      <p>
        This contract is managed by {manager}
        <br />
        There are currently {players.length} people entered,
        <br />
        competing to win {web3.utils.fromWei(balance, 'ether')} ether!
      </p>

      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            type="text"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h1>{message}</h1>
    </main>
  );
}
