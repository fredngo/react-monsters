import React from 'react';

const MonsterForm = ({name, home, creepiness, buttonText}) => {
  return (
    <>
      <form>
        <div>
          <label>
            <span>Name</span>
            &nbsp;
            <input
              name="name"
              value={name}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Home</span>
            &nbsp;
            <input
              name="home"
              value={home}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Creepiness</span>
            &nbsp;
            <input
              name="creepiness"
              value={creepiness}
              required
            />
          </label>
          </div>
        <button>{buttonText}</button>
      </form>
    </>
  );
}

export default MonsterForm;
