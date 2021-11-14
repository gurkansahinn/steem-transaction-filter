import React from 'react';
import './App.css';

import steem from 'steem';

function App() {
  const initalValue: Array<any> = [];

  const [transactions, setTransactions] = React.useState(initalValue);

  React.useEffect(() => {
  }, [])

  function getUserTransactions(event) {
    steem.api.setOptions({ url: 'https://api.steemit.com' });

    steem.api.getAccountHistory(event.target.value, -1, 100, (err, result) => {
      let transfers = result.filter(history => history[1].op[0] === 'transfer')
      setTransactions(transfers);
    })
  }

  return (
    <ul>
      <input type="text" placeholder="Kullanıcı Adı" onChange={getUserTransactions} />

      <hr />
      {transactions.map(item => (
        <li>
          <strong>FROM:</strong> {item[1].op[1].from} - <strong>TO:</strong> {item[1].op[1].to} - <strong>AMOUNT:</strong> {item[1].op[1].amount} - <strong>MEMO:</strong> {item[1].op[1].memo | 0}
        </li>
      ))}
    </ul>
  );
}

export default App;
