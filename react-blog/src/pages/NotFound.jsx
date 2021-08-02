function NotFound(props) {
//   let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{props.location.pathname}</code>
      </h3>
    </div>
  );
}

export default NotFound;