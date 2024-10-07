const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'];

setInterval(() => {
  let test = document.querySelectorAll('.test');
  for (let i = 0; i < test.length; i++) {
    test[i].style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  }
}, 10);


const Alphabet = ({
  onlyVowels = false,
  children
}) => {
  return (
    <>
      <ul className="flex gap-5 text-purple-300 uppercase flex-wrap justify-center p-5">
        {list
          .filter((letter) => {
            if (onlyVowels === true) {
              return letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u';
            } else {
              return true;
            }
          })
          .map((letter, index) => {
            return <li key={index} className="test">{letter}</li>;
          })}
      </ul>
      <div className="flex justify-center">
        {children}
      </div>
    </>
  );
}

export default Alphabet;
