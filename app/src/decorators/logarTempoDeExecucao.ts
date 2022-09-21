export function logarTempoDeExecucao(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: any[]) {
        let divisor = 1;
        let unidade = 'milissegundos';
        if(emSegundos) {
            divisor = 1000;
            unidade = 'segundos';
        }
      const t1 = performance.now();
      //chamar o método original
      const retornoDoMetodo = metodoOriginal.apply(this, args);
      const t2 = performance.now();
      console.log(
        `${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`
      );
      retornoDoMetodo;
    };
    return descriptor;
  };
}
