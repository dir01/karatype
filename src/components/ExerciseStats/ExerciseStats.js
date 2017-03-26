import React, {Component} from 'react';

import './ExerciseStats.css';

class ExerciseStats extends Component {
    render(){
        let { wordsPerMinute, unproductiveKeystrokesRate, accuracy } = this.props.stats;
        accuracy *= 100 ;
        return (
            <table className="Stat"><tbody>{[
                ['WPM', wordsPerMinute],
                ['Accuracy', accuracy],
                ['Unproductive keystrokes', unproductiveKeystrokesRate]
            ].map((stat) =>
                <tr key={ stat[0] }>
                    <td className="Stat__name">{ stat[0] }</td>
                    <td className="Stat__value">{ stat[1] }</td>
                </tr>
            )
        }</tbody></table>);
    }
}

export default ExerciseStats;
