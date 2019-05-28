import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resultText: "",
      calculationText: "",
      clearNext: false
    };
    this.operations = ["Del", "/", "*", "-", "+"];
  }
  calculateResult() {
    const equals = this.state.resultText;
    this.setState({
      calculationText: eval(equals),
      clearNext: true
    });
  }
  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case "/":
      case "*":
      case "-":
      case "+":
        return false;
    }
    return true;
  }
  buttonPressed(text) {
    if (text === "=") {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      resultText: this.state.clearNext
        ? "" + text
        : this.state.resultText + text,
      clearNext: false
    });
  }
  operate(operation) {
    switch (operation) {
      case "Del":
        let text = this.state.resultText.split("");
        text.pop();
        this.setState({ resultText: text.join("") });
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        const lastChar = this.state.resultText.split("").pop();
        if (this.operations.indexOf(lastChar) > 0) {
          return;
        }
        if (this.state.text === "") {
          return;
        }
        this.setState({
          resultText: this.state.resultText + operation,
          clearNext: false
        });
    }
  }
  render() {
    let rows = [];
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [".", 0, "="]];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={[styles.btn, styles.btnBorder]}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    let ops = [];

    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operations[i]}
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}
        >
          <Text style={[styles.btnText, styles.opsColor]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ba7685"
  },
  result: {
    flex: 2,
    backgroundColor: "#f4afc0",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 10
  },
  resultText: {
    fontSize: 35,
    color: "#2e1a36"
  },
  calculation: {
    flex: 1,
    backgroundColor: "#f984a5",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingRight: 10
  },
  calculationText: {
    fontSize: 30,
    color: "white"
  },
  buttons: {
    flex: 7,
    flexDirection: "row"
  },
  btn: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center"
  },
  btnText: {
    fontSize: 35,
    color: "#261831"
  },
  btnBorder: {
    borderColor: "rgba(255, 0, 0, 0.3)",
    borderWidth: 0.5,
    borderRadius: "5%"
  },
  opsColor: {
    color: "#871a51"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  numbers: {
    flex: 3,
    backgroundColor: "#60c5c1"
  },
  operations: {
    flex: 1,
    backgroundColor: "#9ae1dd",
    justifyContent: "space-around",
    alignItems: "stretch"
  }
});
