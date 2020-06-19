import React from 'react';

const MonsterForm = ({name, home, creepiness, bio, handleChange, handleSubmit, buttonText, errors}) => {

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          !errors.length ? null :
          <div id="error_explanation">
            <h2>{errors.length} error(s) prohibited this monster from being saved:</h2>

            <ul>
              { errors.map( (m, i) => <li key={i}>{m}</li> ) }
            </ul>
          </div>
        }

        <div>
          <label>
            <span>Name</span>
            &nbsp;
            <input
              name="name"
              defaultValue={name}
              onChange={handleChange}
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
              defaultValue={home}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Creepiness</span>
            &nbsp;
            <input
              type="number"
              name="creepiness"
              defaultValue={creepiness}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div>
          <label>
            <span>Bio</span>
            &nbsp;
            <textarea
              name="bio"
              defaultValue={bio}
              onChange={handleChange}
            />
          </label>
          </div>
        <button>{buttonText}</button>
      </form>
    </>
  );
}

export default MonsterForm;
