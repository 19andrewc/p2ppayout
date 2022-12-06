let values = {
    "Evan": 336,
    "Johnathan": -245,
    "Max": 23,
    "Andrew": -100,
    "Zach": 15,
    "Sully": 395,
    "Tae": -174,
    "Chan" : -250
}

function generateTransactions(values) {

    let num_unlucky_players = 0; 
    let total_cash = 0;
    var cashout_values = Object.keys(values).map(function(key){
        total_cash += values[key]; 
    });
    total_cash = Math.abs(total_cash)
    console.log("total diff " + total_cash);


    if(total_cash != 0) {
        let num_players = Object.keys(values).length
        console.log('total players ' + num_players)
    
        /* calculating num players to divide by */
        for(let i = num_players; i >= 1; i--) {
            if(total_cash % i == 0 && i <= num_players) {
                    num_unlucky_players = i; 
                    break
            }
        }
        console.log('how many unluck players ' + num_unlucky_players);
    
        let names_unluck_players = []; 
        const unlucky_players = new Set();
        while(unlucky_players.size !== num_unlucky_players) {
            let curr_player_index = Math.floor(Math.random() * num_players);
            unlucky_players.add(curr_player_index);
            names_unluck_players.push(Object.keys(values)[curr_player_index]);
        }
        console.log('names of unlucky players ' + names_unluck_players);
    
    
        let even_divide = total_cash / num_unlucky_players; 
    
        console.log('unlucky player index ' + [...unlucky_players]);
        for (let j = 0;  j < num_players; j++) {
            if(unlucky_players.has(j)) {
                values[Object.keys(values)[j]]  += even_divide
            }
        }
        console.log(values);
    }
   


    transactions = []
    negativePeople = Object.keys(values).filter(key => values[key] < 0)
    positivePeople = Object.keys(values).filter(key => values[key] > 0)

    for (let i = 0; i < negativePeople.length; i++) {
        for (let j = 0; j < positivePeople.length; j++) {
            if (values[negativePeople[i]] < 0 && values[positivePeople[j]] > 0) {
                if (values[negativePeople[i]] + values[positivePeople[j]] < 0) {
                    transactions.push({
                        'from' : negativePeople[i],
                        'to' : positivePeople[j],
                        'amount' : values[positivePeople[j]]
                    })
                    values[negativePeople[i]] += values[positivePeople[j]]
                    values[positivePeople[j]] = 0
                } else {
                    transactions.push({
                        'from' : negativePeople[i],
                        'to' : positivePeople[j],
                        'amount' : -values[negativePeople[i]]
                    })
                    values[positivePeople[j]] += values[negativePeople[i]]
                    values[negativePeople[i]] = 0
                }
            }
        }
    }
    console.log(transactions)
    console.log(values) 
}

generateTransactions(values)