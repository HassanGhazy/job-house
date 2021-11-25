class index extends Component {
    render() {
        return ( <
            header >
            <
            nav class = "navbar navbar-expand-md navbar-dark fixed-top bg-dark" >
            <
            div class = "container-fluid" >
            <
            a class = "navbar-brand"
            href = "/" > Job House < /a> <
            button class = "navbar-toggler"
            type = "button"
            data - bs - toggle = "collapse"
            data - bs - target = "#navbarCollapse"
            aria - controls = "navbarCollapse"
            aria - expanded = "false"
            aria - label = "Toggle navigation" >
            <
            span class = "navbar-toggler-icon" > < /span> < /
            button > <
            div class = "collapse navbar-collapse"
            id = "navbarCollapse" >
            <
            ul class = "navbar-nav me-auto mb-2 mb-md-0" >
            <
            li class = "nav-item active" >
            <
            a class = "nav-link"
            href = "/" > Home < /a> < /
            li > <
            li class = "nav-item" >
            <
            a class = "nav-link"
            href = "about.html" > About Us < /a> < /
            li > <
            li class = "nav-item" >
            <
            a class = "nav-link"
            href = "contact-us.html" > Contact Us < /a> < /
            li > <
            /ul> <
            form style = " float: right;padding-top: 5px;"
            class = "form-inline mt-2 mt-md-0" >

            <
            input style = " float: left; width: 400px !important; padding-top:5px;"
            class = "form-control mr-sm-2"
            type = "text"
            placeholder = "Search"
            aria - label = "Search" / >
            <
            button class = "btn btn-outline-success my-2 my-sm-0"
            style = " margin: 10px; "
            type = "submit" > Search < /button> < /
            form > <
            /div> < /
            div >

            <
            /nav> < /
            header >
        )
    }
}


ReactDOM.render(
    index,
    document.getElementById('root')
);