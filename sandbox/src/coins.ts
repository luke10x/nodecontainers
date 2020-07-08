export const twelveCoinsProblem = (weights: Array<number>) => {

    const results: Array<Array<number>> = [
        [], [], [], [], [], [],
        [], [], [], [], [], []
    ];

    const labels = [
        {id:  0, digits: [0, 1, 1]},
        {id:  1, digits: [0, 1, 2]},
        {id:  2, digits: [0, 2, 1]},
        {id:  3, digits: [0, 2, 2]},
        {id:  4, digits: [1, 0, 1]},
        {id:  5, digits: [1, 0, 2]},
        {id:  6, digits: [1, 1, 0]},
        {id:  7, digits: [1, 2, 0]},
        {id:  8, digits: [2, 0, 1]},
        {id:  9, digits: [2, 0, 2]},
        {id: 10, digits: [2, 1, 0]},
        {id: 11, digits: [2, 2, 0]},
    ];// |  |  |
      // |  |  +- Third weighting plate
      // |  +---- Second weighting plate
      // +------- First weighting plate

    interface ScaleResult {
        winners: Array<number>;
        loosers: Array<number>;
        equals: Array<number>;
    };

    const scale = (weighing: number): ScaleResult => {
        
        const plate0 = labels
            .filter(label => label.digits[weighing] === 0)
            .map(label => label.id);
            
        const plate1 = labels
            .filter(label => label.digits[weighing] === 1)
            .map(label => label.id)
        
        const plate2 = labels
            .filter(label => label.digits[weighing] === 2)
            .map(label => label.id);


        const plateWeight1 = plate1.reduce((acc, id) => { 
            return acc + weights[id];
        }, 0);

        const plateWeight2 = plate2.reduce((acc, id) => { 
            return acc + weights[id];
        }, 0);


        if (plateWeight1 > plateWeight2) {
            return { winners: plate1, loosers: plate2, equals: plate0}
        }
        
        if (plateWeight1 < plateWeight2) {
            return { winners: plate2, loosers: plate1, equals: plate0}
        }
        
        return { winners: [], loosers: [], equals: [...plate1, ...plate2]};
    }

    const weighing0 = scale(0);
    weighing0.winners.forEach(id => {
        results[id].push(1);
    })
    weighing0.loosers.forEach(id => {
        results[id].push(-1);
    })
    weighing0.equals.forEach(id => {
        results[id].push(0);
    })

    const weighing1 = scale(1);
    weighing1.winners.forEach(id => {
        results[id].push(1);
    })
    weighing1.loosers.forEach(id => {
        results[id].push(-1);
    })
    weighing1.equals.forEach(id => {
        results[id].push(0);
    })

    const weighing2 = scale(2);
    weighing2.winners.forEach(id => {
        results[id].push(1);
    })
    weighing2.loosers.forEach(id => {
        results[id].push(-1);
    })
    weighing2.equals.forEach(id => {
        results[id].push(0);
    })

    console.log(results
        // .filter(rewards => rewards.find((reward) => reward === 0) === undefined)
        // .map(rewards => rewards.
            // reduce(
            //     (sum: number, reward: number) => sum + reward,
            //     0
            // )
        // )
    );
    

}