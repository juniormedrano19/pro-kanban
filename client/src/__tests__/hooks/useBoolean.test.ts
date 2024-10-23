import { act, renderHook } from "@testing-library/react";
import { useBoolean } from "../../hooks";


describe("useBoolean", () => {
  it("should use default value", () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toBe(false);
  });

  it("should use provided value", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);
  });

  it("should set to true", () => {
    const { result } = renderHook(() => useBoolean(false));
    
    act(() => {
      result.current.onTrue();
    });
    
    expect(result.current.value).toBe(true);
  });

  it("should set to false", () => {
    const { result } = renderHook(() => useBoolean(true));
    
    act(() => {
      result.current.onFalse();
    });
    
    expect(result.current.value).toBe(false);
  });

  it("should toggle value", () => {
    const { result } = renderHook(() => useBoolean(false));
    
    act(() => {
      result.current.onToggle();
    });
    expect(result.current.value).toBe(true);
    
    act(() => {
      result.current.onToggle();
    });
    expect(result.current.value).toBe(false);
  });

  it("should set specific value", () => {
    const { result } = renderHook(() => useBoolean(false));
    
    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);
    
    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });
});