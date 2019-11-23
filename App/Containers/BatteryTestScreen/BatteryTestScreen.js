import React, { memo, useState, useEffect } from 'react'
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, BenchmarkContainer, ControlsContainer, Button, ButtonText } from './BatteryTestScreen.styles';

const BATTERY_START_LEVEL = 99;
const BATTERY_END_LEVEL = 9;

export const BatteryTestScreen = memo(({ stop, saveResult, addSample }) => {
  const [isCharging, setIsCharging] = useState(false);
  const [batteryStatus, setBatteryStatus] = useState(0);
  let deviceBattery = null;

  const getBatteryPercentLevel = value => Math.trunc(value * 100);

  const handleLevelChange = () => {
    setBatteryStatus(getBatteryPercentLevel(deviceBattery.level));
  };

  const handleChargingChange = () => setIsCharging(deviceBattery.charging);

  const requestBattery = async () => {
    try {
      deviceBattery = await navigator.getBattery();
      setIsCharging(deviceBattery.charging);
      setBatteryStatus(getBatteryPercentLevel(deviceBattery.level));
      deviceBattery.addEventListener('levelchange', handleLevelChange);
      deviceBattery.addEventListener('chargingchange', handleChargingChange);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    requestBattery();

    return () => {
      if (deviceBattery) {
        deviceBattery.removeEventListener('chargingchange', handleChargingChange);
        deviceBattery.removeEventListener('levelchange', handleLevelChange);
      }
    };
  });

  useEffect(() => {
    if (batteryStatus === BATTERY_START_LEVEL) {
      addSample(`start, ${BATTERY_START_LEVEL}%`);
    } else if (batteryStatus === BATTERY_END_LEVEL) {
      saveResult();
    } else if (batteryStatus < BATTERY_START_LEVEL && batteryStatus > BATTERY_END_LEVEL) {
      addSample(batteryStatus);
    }
  }, [batteryStatus]);

  useEffect(() => {
    if (batteryStatus === BATTERY_START_LEVEL) {
      addSample(`start, ${BATTERY_START_LEVEL}%`);
    } else if (batteryStatus === BATTERY_END_LEVEL) {
      saveResult();
    } else if (batteryStatus < BATTERY_START_LEVEL && batteryStatus > BATTERY_END_LEVEL) {
      addSample(batteryStatus);
    }
  }, [batteryStatus]);

  const handleStop = () => stop();
  const handleSaveResult = () => saveResult();

  return (
    <Container>
      <BenchmarkContainer>
      </BenchmarkContainer>
      <ControlsContainer>
        <Button onPress={handleStop} >
          <ButtonText>
            stop
          </ButtonText>
        </Button>

        <Text>charging: {isCharging ? 'true' : 'false'}</Text>
        <Text>battery level: {batteryStatus}%</Text>

        <Button onPress={handleSaveResult} >
          <ButtonText>
            save
          </ButtonText>
        </Button>
      </ControlsContainer>
    </Container>
  );
});

BatteryTestScreen.propTypes = {
  stop: PropTypes.func.isRequired,
  saveResult: PropTypes.func.isRequired,
  addSample: PropTypes.func.isRequired,
};
