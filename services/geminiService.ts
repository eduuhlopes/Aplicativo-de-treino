import { UserData, WorkoutPlan } from "../types";

export const generateWorkoutPlan = async (userData: UserData): Promise<WorkoutPlan> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro do servidor: ${response.statusText}`);
    }

    const plan: WorkoutPlan = await response.json();
    return plan;
    
  } catch (error) {
    console.error("Erro ao chamar a API de geração:", error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("Não foi possível conectar ao servidor para gerar o plano de treino.");
  }
};