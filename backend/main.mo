import Bool "mo:base/Bool";
import Func "mo:base/Func";
import List "mo:base/List";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Random "mo:base/Random";
import Text "mo:base/Text";

actor {
  // List of spelling words
  let words : [Text] = [
    "able", "achieve", "acoustics", "action", "activity", "advertisement", 
    "aftermath", "afternoon", "afterthought", "anoint", "apartment", "apparel", 
    "appear", "appliance", "appoint", "approve", "attack", "attend", "awkward"
  ];

  // Function to get a random word
  public func getRandomWord() : async Text {
    if (words.size() == 0) {
      return "No words available";
    };
    
    let seed = await Random.blob();
    let randomGenerator = Random.Finite(seed);
    let wordsSize = Nat8.fromNat(words.size());
    let randomIndexOpt = randomGenerator.range(wordsSize);
    let randomIndex = switch (randomIndexOpt) {
      case (null) 0;
      case (?index) index;
    };
    words[randomIndex]
  };

  // Function to check if the spelling is correct
  public query func checkSpelling(word: Text, attempt: Text) : async Bool {
    Text.equal(Text.toLowercase(word), Text.toLowercase(attempt))
  };
}
