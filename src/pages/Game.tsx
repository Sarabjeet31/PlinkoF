import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();
  const [money, setMoney] = useState<number>(1234);
  const [betPerBall, setBetPerBall] = useState<number>(0);
  const [ans, setans] = useState<number>(0);
  const [risk, setRisk] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement,
        risk
      );
      setBallManager(ballManager);
    }
  }, [canvasRef, risk]);

  const changeBet = (e: any) => {
    setBetPerBall(e.target.value)
  }
  const handleRisk = (e: any) => {
    setRisk(e.target.value)
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div>
        <div className="flex justify-center space-x-5 text-4xl mt-12">
          <b className="my-auto">Amount</b>
          <input type="text" value={ money } readOnly={ true } className="bg-white text-black text-3xl rounded-sm p-1 font-semibold"  style={{ userSelect: 'none', pointerEvents: 'none' }} />
        </div>
        <div className="flex items-center">
          <div>
            <div className="mb-10">
              <label className="mr-5 text-2xl">Bet Amount</label>
              <input type="text" className="bg-white p-1 text-black font-semibold text-xl" value={ betPerBall } onChange={ e => changeBet(e) } />
            </div>
            <div className="mb-10">
              <label className="mr-5 text-2xl">Risk</label>
              <select name="Risk" id="risk" className="bg-white text-black text-xl font-semibold" value={ risk } onChange={handleRisk}>
                <option value="low">Low</option>
                <option value="medium">Meduim</option>
                <option value="high">High</option>
              </select>
            </div>
            <Button
              className="px-10 mb-4"
              onClick={async () => {
                if (betPerBall > money) {
                  console.log('Insufficent funds!!');
                  return;
                }
                const response = await axios.post(`${baseURL}/game`, {
                  data: 1,
                  risk: risk,
                });
                if (ballManager) {
                  ballManager.addBall(response.data.point);
                  const { multiplier } = response.data
                  setans(multiplier)
                  const moneyToBeAdded = money + multiplier * betPerBall - betPerBall;
                  setMoney(moneyToBeAdded)
                }
              }}
            >
              Add ball
            </Button>
          </div>
          <canvas ref={canvasRef} width="800" height="800"></canvas>
        </div>
      </div>
    </div>
  );
}
