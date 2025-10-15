import { GoogleGenAI, Type } from "@google/genai";
import { UserData, WorkoutPlan } from "../types";

const workoutSchema = {
  type: Type.OBJECT,
  properties: {
    workoutPlan: {
      type: Type.ARRAY,
      description: "Plano de treino semanal completo, dividido por dias.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.STRING,
            description: "O dia da semana para o treino (ex: 'Dia 1', 'Dia 2').",
          },
          focus: {
            type: Type.STRING,
            description: "O principal grupo muscular focado neste dia (ex: 'Peito e Tríceps').",
          },
          daySummary: {
            type: Type.STRING,
            description: "Um resumo conciso ou dica principal para o treino do dia. Por exemplo: 'Foque na contração muscular e controle o movimento em todas as repetições para maximizar o estímulo no peito.'",
          },
          exercises: {
            type: Type.ARRAY,
            description: "Lista de exercícios para o dia.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.STRING,
                  description: "Nome do exercício (ex: 'Supino Reto').",
                },
                description: {
                  type: Type.STRING,
                  description: "Descrição detalhada de como executar o exercício com a forma correta.",
                },
                reps: {
                  type: Type.STRING,
                  description: "Número de séries e repetições (ex: '4x10-12').",
                },
                rest: {
                  type: Type.STRING,
                  description: "Tempo de descanso entre as séries (ex: '60 segundos').",
                },
                equipment: {
                  type: Type.STRING,
                  description: "Equipamento necessário para o exercício (ex: 'Halteres', 'Barra', 'Nenhum').",
                },
                musclesWorked: {
                  type: Type.STRING,
                  description: "Principais músculos trabalhados pelo exercício (ex: 'Peitoral maior, deltoide anterior, tríceps').",
                },
                youtubeVideoId: {
                  type: Type.STRING,
                  description: "O ID de um vídeo PÚBLICO e INCORPORÁVEL do YouTube que demonstre a execução correta do exercício. É CRUCIAL que o vídeo não seja privado, não listado ou com a incorporação desativada. Priorize canais de fitness conhecidos e com instruções claras. Forneça apenas o ID do vídeo (ex: 'abc123xyz').",
                },
              },
              required: ["name", "description", "reps", "rest", "equipment", "musclesWorked", "youtubeVideoId"],
            },
          },
        },
        required: ["day", "focus", "daySummary", "exercises"],
      },
    },
  },
  required: ["workoutPlan"],
};

export const generateWorkoutPlan = async (userData: UserData): Promise<WorkoutPlan> => {
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

  if (!apiKey) {
    console.error("Google AI API key not found in environment variables.");
    throw new Error("A chave de API do Google não está configurada no ambiente do servidor.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Crie um plano de treino detalhado de 5 dias para um usuário com as seguintes características:
    - Peso: ${userData.weight} kg
    - Altura: ${userData.height} cm
    - Objetivo: ${userData.goal}

    O plano deve ser estruturado e focado em academias. Para cada dia de treino, forneça:
    1. Um 'daySummary': um resumo conciso com o foco principal ou uma dica de ouro para o treino daquele dia.
    2. Uma lista de exercícios. Para cada exercício, forneça o nome, uma descrição detalhada da execução correta, o número de séries e repetições, o tempo de descanso, o equipamento necessário, os principais músculos trabalhados e o ID de um vídeo do YouTube relevante, de alta qualidade, PÚBLICO e com INCORPORAÇÃO PERMITIDA que demonstre o exercício. A validade e disponibilidade do vídeo são essenciais.
    Responda APENAS com o objeto JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: workoutSchema,
        systemInstruction: "Você é um personal trainer de classe mundial e especialista em fitness. Sua tarefa é criar planos de treino seguros, eficazes e bem estruturados. A resposta deve ser em português do Brasil.",
      },
    });

    const text = response.text.trim();
    const cleanedJsonText = text.replace(/^```json\s*|```\s*$/g, '');
    const parsedPlan: WorkoutPlan = JSON.parse(cleanedJsonText);
    
    return parsedPlan;
  } catch (error) {
    console.error("Error generating workout plan:", error);
    throw new Error("Falha na comunicação com o modelo de IA. Por favor, tente novamente mais tarde.");
  }
};