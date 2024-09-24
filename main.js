// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
}
  
// console.log(returnRandBase());
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
}
  
// console.log(mockUpStrand());
  
// Task 3. Factory function for creating many pAequors.
  
const pAequorFactory = (number, dnaArray) => {
    return {
      specimenNum: number,
      dna: dnaArray,
      mutate() { // task #4. It's a clunky implementation at this point. 
        const random = Math.floor(Math.random() * this.dna.length);
        const currentBase = this.dna[random];
        const allBases = ['A', 'T', 'C', 'G'];
        const newBases = allBases.filter(base => base !== currentBase);
        const newBase = newBases[Math.floor(Math.random() * newBases.length)];
        this.dna[random] = newBase;
        return this.dna;
      },
      compareDNA(otherPAequor) { // task 5
        const firstDNA = this.dna;
        const secondDNA = otherPAequor.dna;
        let matches = 0;
        for (let i = 0; i< firstDNA.length; i++) {
            if (firstDNA[i] === secondDNA[i]) {
              matches ++; 
            }
        };
        const percentMatch = Math.floor((matches/firstDNA.length) * 100);
        return `specimen #1 and specimen #2 have ${percentMatch}% DNA in common as there are ${matches} matches.`;
      },
      willLikelySurvive() { // task 6
        let cCount = 0;
        let gCount = 0;
        for (let i = 0; i< this.dna.length; i++) {
          if (this.dna[i] === 'C') {
            cCount ++;
          };
          if (this.dna[i] === 'G') {
            gCount ++;
          }
        };
        const survivability = Math.floor(((cCount + gCount) / 15) * 100);
        if (survivability >= 60) {
          return true;
        } else return false;
      },
      complementStrand(complementaryStrand) { // extra task
        const firstDNA = this.dna;
        const secondDNA = complementaryStrand.dna;
        for (let i = 0; i< this.dna.length; i++) {
          const firstBase = this.dna[i]; 
          if (firstBase === 'A') {
            complementaryStrand.dna[i] = 'T';
          } else if (firstBase === 'T') {
            complementaryStrand.dna[i] = 'A';
          } else if (firstBase === 'C') {
            complementaryStrand.dna[i] = 'G';
          } else if (firstBase === 'G') {
            complementaryStrand.dna[i] = 'C';
          };
        }
        return complementaryStrand.dna;
      } 
    }
}
  
// testing task 3 & 4. Printing a species DNA and printing a mutated version of its DNA. 
  
/*
  const newSpecies = pAequorFactory(2, mockUpStrand());
  console.log(newSpecies.dna);
  console.log(newSpecies.mutate());  
*/
  
// testing task 5. First creating the objects, then printing out the objects' DNA and then comparing the percentage of DNA that two objects have in common.
  
const firstSpecies = pAequorFactory(2, mockUpStrand());
console.log(firstSpecies.dna);
  
const secondSpecies = pAequorFactory(16, mockUpStrand());
console.log(secondSpecies.dna);
  
console.log(firstSpecies.compareDNA(secondSpecies)); 
  
// testing task 6, whether a DNA of a particular specimen will likely survive. 
  
  console.log(firstSpecies.willLikelySurvive()); 
  
  console.log(secondSpecies.willLikelySurvive());
  
// Task 7. Creating an array of 30 instances of pAequor that can survive in their natural environment. 
  
const survivingSpecimens = [];
  let specimenNumber = 1;
  
  while (survivingSpecimens.length < 30) {
    const newOrganism = pAequorFactory(specimenNumber, mockUpStrand());
    if (newOrganism.willLikelySurvive()) {
      survivingSpecimens.push(newOrganism);
    };
    specimenNumber++;
};
  
// console.log(survivingSpecimens); // Testing the task 7. Will create a lot of specimens!
  
// Extra task. Testing it.
  
const testStrand = pAequorFactory(3, [ 'T', 'A', 'C', 'A', 'G', 'A', 'T', 'A', 'C', 'G', 'A', 'C', 'G', 'A', 'T' ]);
  
  console.log(testStrand.dna);
  console.log(testStrand.complementStrand(secondSpecies));
  