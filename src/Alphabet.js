const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];

const Alphabet = () => {
    return (
        <ul>
             {list ? list.map((item, index) => (
              <li key={index}>{item}</li>
            )): 'Loading ....'}
          </ul>
    );
}

export default Alphabet;