import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";

const socketEndpoint = "http://4.155.166.68";

export default function App() {
  const [connection, setConnection] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(function didMount() {
    const socket = io(socketEndpoint, {
      path: "/api/websocket/socket.io",
      transports: ["websocket"],
    });

    socket.io.on("open", () => setConnection(true));
    socket.io.on("close", () => setConnection(false));

    socket.on("broadcast", (data) => {
      setMessage(`Server Time: ${new Date(data.date).toString()}, Server Random: ${data.random}`);
    });

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!connection && (
        <>
          <Text style={styles.paragraph}>
            Connecting to {socketEndpoint}...
          </Text>
          <Text style={styles.footnote}>
            Make sure the backend is started and reachable
          </Text>
        </>
      )}

      {connection && (
        <>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Server time
          </Text>
          <Text style={styles.paragraph}>{message}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 16,
  },
  footnote: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
