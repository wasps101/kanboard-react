function UpperBar( { handleThemeSwitch } ) {
  return (
    <div className="upper_bar">
        <div className="top_menu_logo">
            <div className="kanboard_logo">
                <div className="title_characters">
                    <span>k</span>
                    <span>a</span>
                    <span>n</span>
                    <span>b</span>
                    <label className="switch">
                        <input type="checkbox" onChange={() => handleThemeSwitch()}/>
                        <span className="slider"></span>
                    </label>
                    <span>a</span>
                    <span>r</span>
                    <span>d</span>
                </div>
            </div>
        </div>

        

    </div>
  )
}

export default UpperBar
