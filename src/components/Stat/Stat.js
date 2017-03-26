import React, {Component} from 'react';

import './Stat.css';

class Stat extends Component {
  render(){
    let { wordsPerMinute, unproductiveKeystrokesRate, accuracy } = this.props.stats;
    accuracy = accuracy * 100 ;
    return (<table className="Stat">
        {[  ['WPM', wordsPerMinute],
            ['Accuracy', accuracy],
            ['Unproductive keystrokes', unproductiveKeystrokesRate]]
          .map((stat) =>
              <tr>
                <td className="Stat__name">{stat[0]}</td>
                <td className="Stat__value">{stat[1]}</td>
              </tr>
            )
        }
      </table>);
  }
}

export default Stat
