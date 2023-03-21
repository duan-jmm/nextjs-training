export default function Home(props) {
  return {
    redirect: {
      destination: "/home/a",
      permanent: false,
    },
  };
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/home/a",
      permanent: false,
    },
  };
}
